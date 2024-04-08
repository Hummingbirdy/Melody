create table storage.PlaylistSongMapping
(
	MappingId	int				not null	identity(1,1),
	PlaylistId	varchar(150)	not null,
	SongId		varchar(150)	not null,
	CreatedDate	datetime		not null
)
go
alter table storage.PlaylistSongMapping add constraint PK_PlaylistSongMapping primary key clustered (MappingId);
go
--alter table storage.PlaylistSongMapping add constraint UQ_PlaylistSongMapping__PlaylistId_SongId unique nonclustered (PlaylistId, SongId);
--go
alter table storage.PlaylistSongMapping add constraint FK_PlaylistSongMapping_has_Playlist foreign key (PlaylistId) references storage.Playlist (PlaylistId);
go
alter table storage.PlaylistSongMapping add constraint FK_PlaylistSongMapping_has_Song foreign key (SongId) references storage.Song (YouTubeId);
go