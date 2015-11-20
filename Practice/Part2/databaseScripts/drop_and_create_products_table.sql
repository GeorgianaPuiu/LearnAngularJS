USE [angular_db]
GO

ALTER TABLE [dbo].[Products] DROP CONSTRAINT [FK_Products_Categories]
GO

/****** Object:  Table [dbo].[Products]    Script Date: 20-Nov-2015 10:23:15 ******/
DROP TABLE [dbo].[Products]
GO

/****** Object:  Table [dbo].[Products]    Script Date: 20-Nov-2015 10:23:15 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[Products](
	[ID] [int] IDENTITY(1,1) NOT NULL,
	[Name] [nvarchar](50) NOT NULL,
	[Description] [nvarchar](500) NULL,
	[Price] [float] NOT NULL,
	[Stock] [int] NOT NULL,
	[EntryDate] [datetime2](7) NOT NULL,
	[ExpirationDate] [datetime2](7) NOT NULL,
	[CategoryID] [int] NOT NULL,
 CONSTRAINT [PK_Products] PRIMARY KEY CLUSTERED 
(
	[ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO

ALTER TABLE [dbo].[Products]  WITH CHECK ADD  CONSTRAINT [FK_Products_Categories] FOREIGN KEY([CategoryID])
REFERENCES [dbo].[Categories] ([ID])
GO

ALTER TABLE [dbo].[Products] CHECK CONSTRAINT [FK_Products_Categories]
GO

