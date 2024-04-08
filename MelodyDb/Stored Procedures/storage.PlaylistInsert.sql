create procedure storage.PlaylistInsert
	@playlist as storage.PlaylistTableType readonly
as
	insert storage.Playlist (
		PlaylistId,
		PlaylistName,
		PlaylistDescription,
		CreatedDate
	)
	select 
		PlaylistId,
		PlaylistName,
		PlaylistDescription,
		getdate()		
	from @playlist src
	where
		not exists (select * from Playlist tgt 
					where src.PlaylistId = tgt.PlaylistId)
return 0
