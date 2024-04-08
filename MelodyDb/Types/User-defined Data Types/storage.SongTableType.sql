create type storage.SongTableType as table
(
	YouTubeId		varchar(150)	not	null,
	SongName		varchar(255)		null,
	Artist			varchar(255)		null
)
