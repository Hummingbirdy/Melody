create table storage.UploadLog
(
	LogId			int				not null	identity(1,1),
	ErrorMessage	varchar(500)	not null,
	TimeOfError		datetime		not null
)
go
alter table storage.UploadLog add constraint PK_UploadLog primary key clustered (LogId);
go
