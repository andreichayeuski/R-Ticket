use [R-Ticket]
insert into [WeekDay]
values ('�����������', '��'),
('�������','��'),
('�����','��'),
('�������','��'),
('�������','��'),
('�������','��'),
('�����������','��')

select * from [WeekDay]

insert into TrainType
values ('������������� �����'),
('��������������� ����� ������-������'),
('��������������� ����� ������������'),
('������������ ����� ������-������'),
('������������ ����� ������������'),
('��������� �����')

select * from TrainType

insert into PlaceType ([Name], ShortName, Code, [Count])
values ('�������� ����� (����������� ����)', '��', '��', 18),
('������������ ����� (������������� ����)', '����', '�', 36),
('����������� ����� (�������� ���� � ����� �������� �������)', '�����������', '��', 54),
('����� ������ � ����������� ������� ��� �������', '�����', '�', 81),
('����� � ������� ��� �������', '�������', '�', 62)

select * from PlaceType

insert into CarType
values ('3�', '�����������'),
('2B', '����� � ��������')

select * from CarType

insert into Country
	values ('��������', '��������')

select * from Country

insert into UserDB
values ('adminR-Ticket', 'admin'),
('userR-Ticket', 'user'),
('dispatcherR-Ticket', 'dispatcher'),
('defaultR-Ticket', 'default')

select * from UserDB

insert into UserRole
values ('���������', 3),
('������������', 2),
('�������������', 1)

select * from UserRole


GRANT EXECUTE ON OBJECT::RecoveryFromBackup
    TO [adminR-Ticket];  
GO  