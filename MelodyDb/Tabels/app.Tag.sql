﻿create table app.Tag
(
	TagId				int				not null	identity(1,1),
	TagName				varchar(100)	not null,
	Color				varchar(10)			null,
	FavoriteOrder		int					null,
	IsAIGenerated		bit				not null	default 0,
)
go
alter table app.Tag add constraint PK_Tag primary key clustered (TagId);
go
