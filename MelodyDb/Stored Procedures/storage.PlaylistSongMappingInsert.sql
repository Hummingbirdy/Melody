create procedure storage.PlaylistSongMappingInsert
	@mapping as storage.MappingTableType readonly
as
	insert PlaylistSongMapping (
		PlaylistId,
		SongId,
		CreatedDate
	)
	select
		PlaylistId,
		SongId,
		getdate()
	from @mapping src
	where
		not exists (select * from PlaylistSongMapping tgt
					where src.PlaylistId = tgt.PlaylistId
					and src.SongId = tgt.SongId)

return 0
