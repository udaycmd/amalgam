namespace priory.Static;

using priory.Dtos;

public static class ChannelStore
{
    public static readonly List<Channel> Channels = [
        new("th", "Technology", "Technology & Software", false),
        new("vg", "Video Games", "Video Games", false),
        new("am", "Anime & Manga", "Anime & Manga", false),
        new("ph", "Photography", "Photography", false),
        new("ck", "Food & Cooking", "Food & Cooking", false),
        new("fit", "Fitness", "Health & Fitness", false),
    ];
}
