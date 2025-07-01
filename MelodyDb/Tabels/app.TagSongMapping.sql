create table app.TagSongMapping
(
	MappingId		int				not null	identity(1,1),
	TagId			int				not null,
	SongId			varchar(150)	not null,
	CreatedDate		datetime		not null,
	IsAIGenerated	bit				not null	default 0
)
go 
alter table app.TagSongMapping add constraint PK_TagSongMapping primary key clustered (MappingId);
go
alter table app.TagSongMapping add constraint UQ_TagSongMapping__TagId_SongId unique nonclustered (TagId, SongId);
go
alter table app.TagSongMapping add constraint FK_TagSongMapping_has_Tag foreign key (TagId) references app.Tag (TagId);
go
alter table app.TagSongMapping add constraint FK_TagSongMapping_has_Song foreign key (SongId) references storage.Song (YouTubeId);
go
