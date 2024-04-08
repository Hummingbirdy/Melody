create table app.ListenRecord
(
	RecordId		int				not null	identity(1,1),
	SongId			varchar(150)	not null,
	StartTime		datetime		not null,
	ListenLength	int				not null
)
go
alter table app.ListenRecord add constraint PK_ListenRecord primary key clustered (RecordId);
go
alter table app.ListenRecord add constraint FK_ListenRecord_has_song foreign key (SongId) references storage.Song (YouTubeId);
go
