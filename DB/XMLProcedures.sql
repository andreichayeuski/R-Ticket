use [R-Ticket]

go
create procedure [dbo].[import_xml]
as
begin
	declare @xml xml; 
	select @xml = convert(xml, bulkcolumn, 2) from openrowset(bulk 'E:\resorts.xml', single_blob) as X 
	select @xml
		insert into country 
		select 
			P.value('Name[1]','VARCHAR(max)') AS Name,
			P.value('visa_regime[1]','varchar(max)') as visa_regime,
			P.value('visa_cost[1]','int') as visa_cost
			FROM @xml.nodes('/resorts/resort') PropertyFeed(P);
end;

go
create procedure [dbo].[export_xml]
as
begin
EXEC master.dbo.sp_configure 'show advanced options', 1 
RECONFIGURE 
EXEC master.dbo.sp_configure 'xp_cmdshell', 1 
RECONFIGURE 

EXEC xp_cmdshell 'bcp "use tourist_agency SELECT name,visa_regime,visa_cost FROM country FOR XML PATH (''country''), ROOT(''countries'')" queryout "E:\resorts.xml" -U admin_login -P iamboss -S USER-PC\MSSQL -w' 
end