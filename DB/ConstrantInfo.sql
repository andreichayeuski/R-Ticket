use [R-Ticket]
insert into [WeekDay]
values ('Понедельник', 'пн'),
('Вторник','вт'),
('Среда','ср'),
('Четверг','чт'),
('Пятница','пт'),
('Суббота','сб'),
('Воскресенье','вс')

select * from [WeekDay]

insert into TrainType
values ('Международные линии'),
('Межрегиональные линии бизнес-класса'),
('Межрегиональные линии экономкласса'),
('Региональные линии бизнес-класса'),
('Региональные линии экономкласса'),
('Городские линии')

select * from TrainType

insert into PlaceType ([Name], ShortName, Code, [Count])
values ('Спальный вагон (двухместное купе)', 'СВ', 'СВ', 18),
('Купированный вагон (четырёхместное купе)', 'Купе', 'К', 36),
('Плацкартный вагон (открытое купе с двумя боковыми местами)', 'Плацкартный', 'ПЛ', 54),
('Общие вагоны с полужёсткими местами для сидения', 'Общий', 'О', 81),
('Вагон с местами для сидения', 'Сидячий', 'С', 62)

select * from PlaceType

insert into CarType
values ('3П', 'Плацкартный'),
('2B', 'Вагон с услугами')

select * from CarType

insert into Country
	values ('Беларусь', 'Синеокая')

select * from Country

insert into UserDB
values ('adminR-Ticket', 'admin'),
('userR-Ticket', 'user'),
('dispatcherR-Ticket', 'dispatcher'),
('defaultR-Ticket', 'default')

select * from UserDB

insert into UserRole
values ('Диспетчер', 3),
('Пользователь', 2),
('Администратор', 1)

select * from UserRole


GRANT EXECUTE ON OBJECT::RecoveryFromBackup
    TO [adminR-Ticket];  
GO  