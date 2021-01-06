const changelog = [
  {
    version: "1.0.6",
    date: "01/05/20",
    changes: [
      {
        type: "feature",
        desc: "Added version numbering and changelog.",
      },
    ],
  },
  {
    version: "1.0.5",
    date: "12/14/20",
    changes: [
      {
        type: "bugfix",
        desc:
          "Changed fullscreen display of playlist to stretch for XL (1920w) screens.",
      },
      {
        type: "bugfix",
        desc: "Fixed layout of player in relation to table.",
      },
      {
        type: "feature",
        desc: "Added Spotify web player so individual tracks can be played.",
      },
    ],
  },
  {
    version: "1.0.4",
    date: "10/25/20",
    changes: [
      {
        type: "bugfix",
        desc:
          "Fixed bug where null tracks in playlist would crash application.",
      },
    ],
  },
];

export default changelog;
