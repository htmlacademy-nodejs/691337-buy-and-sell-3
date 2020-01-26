'use strict';

module.exports = {
  name: `--help`,
  run () {
    const info = `
    Программа формирует файл с моковыми данными

    Команды:
    --version           Выводит номер версии
    --help              Выводит справку
    --generate <count>  Формирует файл mocks.json
    `;

    console.log(info);
  }
};
