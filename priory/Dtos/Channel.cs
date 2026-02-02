namespace priory.Dtos;

public record Channel(
    string Id,
    string Name,
    string Desc,
    bool Nsfw
);
