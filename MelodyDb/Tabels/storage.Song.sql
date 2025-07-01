create table storage.Song
(
	YouTubeId						varchar(150)	not	null,
	SongName						varchar(255)		null,
	Artist							varchar(255)		null,
	CreatedDate						datetime		not null,
	YouTubeAddedDate				datetime			null,
	IsValid							bit				not null	default 1,
	InAzure							bit				not null	default 0,
	UploadFailed					bit				not null	default 0,
	HasRanThroughTagAIGeneration	bit				not null	default 0,
	FromSpotify						bit				not null	default 0,
)
go
alter table storage.Song add constraint PK_Song primary key clustered (YoutubeId);
go
