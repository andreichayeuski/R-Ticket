use [R-Ticket]

go
create alter procedure CreateUser
@FName nvarchar(50),
@SName nvarchar(50),
@MName nvarchar(50),
@Email nvarchar(50),
@Birthday date,
@Sex bit,
@Passport nvarchar(30),
@FNameEn nvarchar(50),
@SNameEn nvarchar(50),
@Telephone nvarchar(20),
@Login nvarchar(50),
@Password nvarchar(30),
@CountryId int,
@RoleId int
as
begin
	declare @countBefore int,
			@countAfter int,
			@count int,
			@result int
	set @countBefore = (select count(*) from [User])
	insert into [User] (FName, MName, SName, FNameEn, SNameEn, Email, Birthday
		, Sex, Passport, Telephone, [Login], [Password], CountryId, RoleId)
		values (@FName, @MName, @SName, @FNameEn, @SNameEn, @Email, @Birthday
		, @Sex, @Passport, @Telephone, @Login, @Password, @CountryId, @RoleId)
	set @countAfter = (select count(*) from [User])
	set @result = @countAfter - @countBefore
	select @result as result
end

go
create procedure GetRole
as
begin
	select * from [UserRole]
end

go
create procedure GetUser
as
begin
	select * from [User]
end
select * from UserDB
go
create procedure GetCountry
as
begin
	select * from [Country]
end

go
create procedure LoginIntoRTicket
@login nvarchar(50),
@password nvarchar(30)
as
begin
	if (select count(*) from [User] 
			where [Login] = @login and [Password] = @password) = 1
			begin
				select [Name], [Password] from UserDB
					where Id = (select UserDBId from UserRole
									where Id = (select RoleId from [User]
													where [Login] = @login and [Password] = @password))
			end
	else
		begin
			select -1 as result
		end
end


use tourist_agency;

create login manager_login with password = 'iammanager';
create user manager for login manager_login;
create role manager_role;
grant select,insert,delete,update on data to manager_role;
grant select,insert,delete,update on resort to manager_role;
grant select,insert,delete,update on country to manager_role;
grant select,insert,delete,update on tour to manager_role;
grant select,insert,delete,update on abode to manager_role;
grant execute to manager_role;
alter role manager_role add member manager;
create login user_login with password = 'iamuser';
create user [user] for login user_login;
create role user_role;
grant select on resort to user_role
grant select on country to user_role;
grant select on client_info to user_role;
grant select on data to user_role;
grant select on order to user_role;
grant select on tour to user_role;
grant select on abode to user_role;
grant execute to user_role;
alter role user_role add member [user];
create login admin_login with password = 'iamboss';
create user [admin] for login admin_login;
create role admin_role;
grant select,insert,update,delete to admin_role;
grant execute to admin_role;
revoke insert,update on client_info to admin_role;
revoke insert,update on client to admin_role;
alter role admin_role add member [admin];