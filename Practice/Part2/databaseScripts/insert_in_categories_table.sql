USE [angular_db]
GO
 
declare @i int;
SET @i = 0;
while @i < 5
begin
	INSERT INTO [dbo].[Categories]
           ([Name])
     VALUES
           ('Category_'+CONVERT(varchar(10),@i))
	SET @i = @i + 1;
end;
GO