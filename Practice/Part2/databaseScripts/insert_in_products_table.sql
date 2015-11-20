USE [angular_db]
GO
 
declare @i int;
declare @categID int;
set @i = 1;
select top 1 @categID = ID from [dbo].[Categories] order by ID;
while @i < 6	
begin
	INSERT INTO [dbo].[Products]
           ([Name]
           ,[Description]
           ,[Price]
           ,[Stock]
           ,[EntryDate]
           ,[ExpirationDate]
           ,[CategoryID])
     VALUES
		(
		'Product_'+CONVERT(varchar(10),@i)
        ,'Description_'+CONVERT(varchar(10),@i)
        ,@i 
        ,@i
        ,GETDATE()
        ,GETDATE()
        ,@categID
		);
	SET @i = @i + 1;
end;
go 















GO


INSERT INTO [dbo].[Categories] values (Name+" "+ID)
SELECT ID, Name FROM [dbo].[Categories] 
WHERE ID <> 5


INSERT INTO [dbo].[Categories]
           ([Name])
     VALUES
           ('Category1')
GO
INSERT INTO [dbo].[Categories]
           ([Name])
     VALUES
           ('Laptop')
GO

INSERT INTO [dbo].[Categories]
           ([Name])
     VALUES
           ('TV')
GO


INSERT INTO [dbo].[Products]
           ([Name]
           ,[Description]
           ,[Price]
           ,[Stock]
           ,[EntryDate]
           ,[ExpirationDate]
           ,[CategoryID])
     VALUES
           ('Product 1'
           ,<Description, nvarchar(500),>
           ,<Price, float,>
           ,<Stock, int,>
           ,<EntryDate, datetime2(7),>
           ,<ExpirationDate, datetime2(7),>
           ,<CategoryID, int,>)
GO


