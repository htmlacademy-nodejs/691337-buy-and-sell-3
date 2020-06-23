
    ---
    --- Data for table: users; Type: TABLE DATA; Schema: public
    ---

    INSERT INTO users VALUES
    (DEFAULT, 'Ivan', 'Petrov', 'ivpetr@fan.local', 'UXhDWA', 'item11.jpg'),
    (DEFAULT, 'Viktor', 'Sidorov', 'vsidor@fan.local', 'BeZuTg', 'item03.jpg');
     
    ---
    --- Data for table: offers; Type: TABLE DATA; Schema: public
    ---

    INSERT INTO offers VALUES
    (DEFAULT, 'Куплю палки для скандинавской ходьбы', '2020-05-06', 'item11.jpg', 78705, 'offer', 'Если товар не понравится — верну всё до последней копейки.', 1),
    (DEFAULT, 'Куплю старинный столовый сервиз', '2020-04-12', 'item12.jpg', 31463, 'sale', 'Цена - одна из лучших на рынке. Если товар не понравится — верну всё до последней копейки.', 2),
    (DEFAULT, 'Продам череп из гипса ручной работы', '2020-03-29', 'item03.jpg', 71748, 'sale', 'Продаю с болью в сердце... В комплекте со всеми необходимыми комплектующими для установки. Никаких подвохов.', 2),
    (DEFAULT, 'Продам новую приставку Sony Playstation 5', '2020-06-03', 'item06.jpg', 45970, 'offer', 'Товар в отличном состоянии.', 2),
    (DEFAULT, 'Продам отличную подборку фильмов на VHS', '2020-06-11', 'item07.jpg', 41989, 'sale', 'Возможен обмен на другую модель.', 1);
     
    ---
    --- Data for table: comments; Type: TABLE DATA; Schema: public
    ---

    INSERT INTO comments VALUES
    (DEFAULT, 'А сколько игр в комплекте?', 1, 1),
    (DEFAULT, 'С чем связана продажа? Почему так дешёво?', 1, 1),
    (DEFAULT, 'Вы что?! В магазине дешевле.', 2, 1),
    (DEFAULT, 'Продаю в связи с переездом. Отрываю от сердца.', 2, 1),
    (DEFAULT, 'Оплата наличными или перевод на карту?', 2, 1),
    (DEFAULT, 'С чем связана продажа? Почему так дешёво?', 2, 1),
    (DEFAULT, 'Продаю в связи с переездом. Отрываю от сердца.', 3, 1),
    (DEFAULT, 'Вы что?! В магазине дешевле.', 3, 2),
    (DEFAULT, 'Совсем немного...', 3, 2),
    (DEFAULT, 'Почему в таком ужасном состоянии?', 4, 1),
    (DEFAULT, 'Неплохо, но дорого', 4, 1),
    (DEFAULT, 'Продаю в связи с переездом. Отрываю от сердца.', 4, 2),
    (DEFAULT, 'Оплата наличными или перевод на карту?', 4, 2),
    (DEFAULT, 'Вы что?! В магазине дешевле.', 4, 2),
    (DEFAULT, 'Продаю в связи с переездом. Отрываю от сердца.', 5, 1),
    (DEFAULT, 'С чем связана продажа? Почему так дешёво?', 5, 1);
     
    ---
    --- Data for table: categories; Type: TABLE DATA; Schema: public
    ---

    INSERT INTO categories VALUES
    (DEFAULT, 'Книги', 'item09.jpg'),
    (DEFAULT, 'Разное', 'item05.jpg'),
    (DEFAULT, 'Посуда', 'item10.jpg'),
    (DEFAULT, 'Игры', 'item10.jpg'),
    (DEFAULT, 'Животные', 'item10.jpg'),
    (DEFAULT, 'Журналы', 'item10.jpg'),
    (DEFAULT, 'Транспорт', 'item05.jpg'),
    (DEFAULT, 'Запчасти', 'item11.jpg'),
    (DEFAULT, 'Электроника', 'item03.jpg'),
    (DEFAULT, 'Отдых и спорт', 'item01.jpg');
     
    ---
    --- Data for table: offers_categories; Type: TABLE DATA; Schema: public
    ---

    INSERT INTO offers_categories VALUES
    (1, 10),
    (2, 4),
    (2, 3),
    (3, 2),
    (3, 5),
    (3, 10),
    (4, 2),
    (5, 1),
    (5, 6);
    