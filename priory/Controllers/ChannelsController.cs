namespace priory.Controllers;

using priory.Static;
using Microsoft.AspNetCore.Mvc;

[ApiController]
[Route("api/channels")]
public class ChannelsController : ControllerBase
{
    [HttpGet]
    public IActionResult GetChannels()
    {
        return Ok(ChannelStore.Channels);
    }
}
