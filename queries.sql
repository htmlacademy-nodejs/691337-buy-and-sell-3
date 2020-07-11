--
-- Get a list of all categories
--
SELECT
  categories.category_id,
  categories.category_title
FROM categories;

--
-- Get a list of categories that have offers
--
SELECT
	categories.category_id,
	categories.category_title
FROM categories
WHERE categories.category_id IN (
	SELECT offers_categories.category_id
	FROM offers_categories
);

--
-- Get a list of categories with the number of offers
--
SELECT
  categories.category_id,
  categories.category_title,
  COUNT(*) AS offers_amount
  FROM offers_categories
LEFT JOIN categories USING(category_id)
GROUP BY
  categories.category_id,
  categories.category_title
ORDER BY offers_amount DESC;

--
-- Get a list of offers
--
SELECT
  offers.offer_id,
  offers.offer_title,
  offers.price,
  offers.offer_type,
  offers.description_text,
  offers.created_date,
  concat(users.first_name, ' ', users.last_name) AS author,
  users.email,
  (SELECT
    COUNT(*)
    FROM comments
    WHERE comments.offer_id = offers.offer_id) AS comments_amount,
  string_agg (categories.category_title, ', ') AS categories
FROM offers_categories
LEFT JOIN offers USING(offer_id)
LEFT JOIN categories USING(category_id)
LEFT JOIN users
  ON offers.author_id = users.user_id
GROUP BY
  offers.offer_id,
  concat(users.first_name, ' ', users.last_name),
  users.email
ORDER BY offers.created_date DESC;

--
-- Get full details of a specific offer
--
SELECT
  offers.offer_id,
  offers.offer_title,
  offers.price,
  offers.offer_type,
  offers.description_text,
  offers.created_date,
  concat(users.first_name, ' ', users.last_name) AS author,
  users.email,
  (SELECT
    COUNT(*)
    FROM comments
    WHERE comments.offer_id = offers.offer_id) AS comments_amount,
  string_agg (categories.category_title, ', ') AS categories
FROM offers_categories
LEFT JOIN offers USING(offer_id)
LEFT JOIN categories USING(category_id)
LEFT JOIN users
  ON offers.author_id = users.user_id
WHERE offers.offer_id = 3
GROUP BY
  offers.offer_id,
  concat(users.first_name, ' ', users.last_name),
  users.email;

--
-- Get a list of 5 last comments
--
SELECT
	comments.comment_id,
	comments.offer_id,
	concat(users.first_name, ' ', users.last_name) AS author,
	comments.comment_text
FROM comments
INNER JOIN users ON comments.author_id = users.user_id
ORDER BY comment_id DESC
LIMIT 5;

--
-- Get a list of comments for a specific offer
--
SELECT
	comments.comment_id,
	comments.offer_id,
	concat(users.first_name, ' ', users.last_name) AS author,
	comments.comment_text
FROM comments
INNER JOIN users ON comments.author_id = users.user_id
WHERE comments.offer_id = 3
ORDER BY comments.comment_id DESC;

--
-- Choose 2 offers matching type "offer"
--
SELECT *
FROM offers
WHERE offers.offer_type = 'offer'
LIMIT 2;

--
-- Update title for a specific offer
--
UPDATE offers
	SET offer_title = 'Уникальное предложение!'
WHERE offer_id = 1;
