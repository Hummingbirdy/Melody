create procedure storage.SongInsert
	@song as storage.SongTableType readonly
as
	insert Song (
		YouTubeId,
		SongName,
		Artist,
		CreatedDate

	)
	select 
		YouTubeId,
		SongName,
		Artist,
		getdate()		
	from @song src
	where
		not exists (select * from Song tgt 
					where src.YouTubeId = tgt.YouTubeId)
return 0
