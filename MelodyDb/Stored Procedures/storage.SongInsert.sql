﻿create procedure storage.SongInsert
	@song as storage.SongTableType readonly,
	@spotify as bit = 0
as
	insert Song (
		YouTubeId,
		SongName,
		Artist,
		CreatedDate,
		YouTubeAddedDate,
		FromSpotify
	)
	select 
		YouTubeId,
		SongName,
		Artist,
		getdate(),
		YouTubeAddedDate,
		@spotify
	from @song src
	where
		not exists (select * from Song tgt 
					where src.YouTubeId = tgt.YouTubeId)

	--merge storage.Song as tgt
	--using @song as src
	--on src.YouTubeId = tgt.YouTubeId

	--when matched then
	--	update set
	--		tgt.Artist = src.Artist
	--when not matched by target then
	--	insert (
	--		YouTubeId,
	--		SongName,
	--		Artist,
	--		CreatedDate,
	--		YouTubeAddedDate
	--	)
	--	values (
	--		src.YouTubeId,
	--		src.SongName,
	--		src.Artist,
	--		getdate(),
	--		src.YouTubeAddedDate
	--	);

return 0
