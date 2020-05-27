export class YoutubeResult{
  public items:YoutubeItem[]
}

export class YoutubeItem{
    public id:{
      kind: string
      videoId: string
  }
}
