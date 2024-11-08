/*
  Создание базы данных с указанными параметрами.

  Параметры:
  - ${dbName}: имя новой базы данных.

  - ENCODING 'UTF8': задает кодировку данных в базе данных.
    UTF-8 поддерживает множество символов и является наиболее распространенной
    кодировкой.

  - LC_COLLATE 'ru_RU.UTF-8': определяет правила сортировки и сравнения строк
    в базе данных. Он контролирует, как строки упорядочиваются и как
    происходит их сравнение. Например, в русской локализации строки "абрикос"
    и "персик" будут правильно упорядочены согласно русскому алфавиту. Также
    может влиять на чувствительность к регистру при сравнении строк.

  - LC_CTYPE 'ru_RU.UTF-8': задает правила обработки и отображения символов.
    Этот параметр определяет, какие символы считаются буквами, цифрами или
    пробелами, и влияет на работу строковых функций, таких как UPPER и LOWER.
    Например, он определяет, как интерпретировать заглавные и строчные
    буквы в русском языке.

  - TEMPLATE template0: указывает, что база данных должна быть создана на
    основе шаблона template0, который является чистым и не содержит
    пользовательских объектов или расширений.
*/

CREATE DATABASE ${dbName}
ENCODING 'UTF8'
LC_COLLATE 'ru_RU.UTF-8'
LC_CTYPE 'ru_RU.UTF-8'
TEMPLATE template0;
