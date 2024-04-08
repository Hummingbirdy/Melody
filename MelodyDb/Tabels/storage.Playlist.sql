create table storage.Playlist
(
	PlaylistId				varchar(150)	not	null,
	PlaylistName			varchar(100)	not null,
	PlaylistDescription		varchar(500)		null,
	CreatedDate				datetime
)
go
alter table storage.Playlist add constraint PK_Playlist primary key clustered (PlaylistId);
go