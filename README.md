Автоматизированная система управления заявками предназначена для обеспечения стабильной работы организации, а также своевременного реагирования сотрудниками службы техподдержки на возникающие неполадки. Предусмотрены в системе следующие разделения ролей:
- администратор;
- специалист;
- пользователь.

Для роли "Администратор" доступны следующие функциональные возможности:
- авторизация;
- возможность смены логина (нужно подтверждать смену в эл. письме, отправленным на новую почту / логин) и личных данных в личном кабинете;
- сброс пароля (отправляется письмо на emаil/логин)
- просмотр истории всех заявок;
- фильтрация заявок по статусу заявки;
- назначение исполнителя заявки;
- удаление заявки (возможно только в статусе "Новая" и "Выполнена");
- просмотр всех сотрудников;
- изменение данных сотрудника, назначение роли сотруднику;
- удаление сотрудника (Но окончательное удаление аккаунта возможно только через Firestore):

Для роли "Специалист" доступны следующие функциональные возможности:
- авторизация;
- возможность смены логина (нужно подтверждать смену в эл. письме, отправленным на новую почту / логин) и личных данных в личном кабинете;
- сброс пароля (отправляется письмо на emаil/логин)
- просмотр истории назначенных для выполнения заявок;
- изменение статуса заявки с "В работе" на "Выполнена";
- формирование отчёта по заявкам (Количество заявок "В работе" и "Выполнена", кол-во всех заявок), также в отчёт входит таблица выполненных заявок со следующей информацией: ФИО пользователя создавшего заявку, кабинет, название заявки, дата подачи заявки;

Для роли «Пользователь» доступны следующие функциональные возможности:
- регистрация / авторизация;
- возможность смены логина (нужно подтверждать смену в эл. письме, отправленным на новую почту / логин) и личных данных в личном кабинете;
- сброс пароля (отправляется письмо на emаil/логин)
- просмотр истории своих заявок;
- создание заявки в системе;

Для обеспечения защиты данных от несанкционированного доступа вход в систему имеют только пользователи, которые прошли авторизацию по логину и паролю.

Ссылка на Web-приложение: https://support-service.netlify.app
