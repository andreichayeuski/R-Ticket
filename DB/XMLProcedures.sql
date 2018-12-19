use [R-Ticket]

go
create procedure ImportFromXML
as
begin
	declare @xml xml; 
	select @xml = convert(xml, bulkcolumn, 2) from openrowset(bulk 'D:\place_types.xml', single_blob) as X 
	select @xml
		insert into PlaceType 
		select 
			P.value('Name[1]','nvarchar(70)') AS Name,
			P.value('Code[1]','nvarchar(2)') as Code,
			P.value('ShortName[1]','nvarchar(20)') as ShortName,
			P.value('Count[1]','int') as Count
			FROM @xml.nodes('/place_types/place_type') PropertyFeed(P);
end;

go
create procedure ExportToXML
as
begin
EXEC [R-Ticket].dbo.sp_configure 'show advanced options', 1 
RECONFIGURE 
EXEC [R-Ticket].dbo.sp_configure 'xp_cmdshell', 1 
RECONFIGURE 

EXEC xp_cmdshell 'bcp "use [R-Ticket] SELECT Name,Code,ShortName,Count FROM PlaceType FOR XML PATH (''place_type''), ROOT(''place_types'')" queryout "D:\place_types.xml" -w -T' 
end