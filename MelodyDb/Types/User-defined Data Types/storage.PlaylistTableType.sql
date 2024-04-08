create type storage.PlaylistTableType as table
(
	PlaylistId				varchar(150)	not	null,
	PlaylistName			varchar(100)	not null,
	PlaylistDescription		varchar(500)		null
)
