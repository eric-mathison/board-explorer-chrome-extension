export type Pin = {
  id: string;
  title?: string;
  description?: string;
};

export type Board = {
  id: string;
  title?: string;
  description?: string;
};

export async function fetchBoardPins(
  boardId: string,
  bookmark: string | null,
  boardUrl?: string,
) {
  const url = "https://www.pinterest.com/resource/BoardFeedResource/get/";
  const data = {
    options: {
      board_id: boardId,
      add_vase: true,
      bookmarks: [bookmark],
      field_set_key: "react_grid_pin",
      is_react: true,
      filter_section_pins: false,
      page_size: 250,
    },
    context: {},
  };
  const params = new URLSearchParams({
    data: JSON.stringify(data),
    source_url: `${boardUrl}`,
  });

  const res = await fetch(url + "?" + params.toString(), {
    method: "GET",
    headers: {
      "x-pinterest-pws-handler": `www/${boardUrl}.js`,
    },
  });
  if (!res.ok) throw new Error("Failed to fetch board");
  return res.json();
}

export async function fetchBoardSectionPins(
  sectionId: string,
  bookmark: string | null,
  boardUrl?: string,
) {
  const url = "https://www.pinterest.com/resource/BoardSectionPinsResource/get/";
  const data = {
    options: {
      section_id: sectionId,
      bookmarks: [bookmark],
      field_set_key: "react_grid_pin",
      page_size: 50,
    },
    context: {},
  };
  const params = new URLSearchParams({
    data: JSON.stringify(data),
    source_url: `${boardUrl}`,
  });

  const res = await fetch(url + "?" + params.toString(), {
    method: "GET",
    headers: {
      "x-pinterest-pws-handler": `www/${boardUrl}.js`,
    },
  });
  if (!res.ok) throw new Error("Failed to fetch board");
  return res.json();
}

export async function fetchBoardSections(boardId: string, boardUrl?: string) {
  const url = "https://www.pinterest.com/resource/BoardSectionsResource/get/";
  const data = {
    options: {
      board_id: boardId,
    },
    context: {},
  };
  const params = new URLSearchParams({
    data: JSON.stringify(data),
    source_url: `${boardUrl}`,
  });

  const res = await fetch(url + "?" + params.toString(), {
    method: "GET",
    headers: {
      "x-pinterest-pws-handler": `www/${boardUrl}.js`,
    },
  });
  if (!res.ok) throw new Error("Failed to fetch board");
  return res.json();
}

export async function fetchBoardlessPins(userId: string, bookmark: string | null) {
  const url = "https://www.pinterest.com/resource/BoardlessPinsResource/get/";
  const data = {
    options: {
      userId,
      bookmarks: [bookmark],
      field_set_key: "react_grid_pin",
      page_size: 50,
    },
    context: {},
  };
  const params = new URLSearchParams({
    data: JSON.stringify(data),
    source_url: `/${userId}/`,
  });

  const res = await fetch(url + "?" + params.toString(), {
    method: "GET",
    headers: {
      "x-pinterest-pws-handler": `www/${userId}.js`,
    },
  });
  if (!res.ok) throw new Error("Failed to fetch boardless pins");
  return res.json();
}

export async function fetchBoard(boardId: string): Promise<Board> {
  const url = "https://www.pinterest.com/resource/BoardResource/get/";
  const data = {
    options: {
      page_size: 1,
      board_id: boardId,
    },
    context: {},
  };

  const params = new URLSearchParams({
    data: JSON.stringify(data),
    source_url: `/${boardId}/`,
  });

  const res = await fetch(url + "?" + params.toString(), {
    method: "GET",
    headers: {
      "x-pinterest-pws-handler": `www/${boardId}.js`,
    },
  });
  if (!res.ok) throw new Error("Failed to fetch board");
  return res.json();
}

export async function fetchPin(pinId: string): Promise<Pin> {
  const url = "https://www.pinterest.com/resource/PinResource/get/";
  const data = {
    options: {
      id: pinId,
      field_set_key: "auth_web_main_pin",
      get_page_metadata: false,
    },
    context: {},
  };

  const params = new URLSearchParams({
    data: JSON.stringify(data),
    source_url: `/pin/${pinId}/`,
  });

  const res = await fetch(url + "?" + params.toString(), {
    method: "GET",
    headers: {
      "x-pinterest-pws-handler": `www/pin/${pinId}.js`,
    },
  });
  if (!res.ok) throw new Error("Failed to fetch board");
  return res.json();
}

export async function fetchUser(userId: string) {
  const url = "https://www.pinterest.com/resource/UserResource/get/";
  const data = {
    options: {
      username: userId,
    },
    context: {},
  };

  const params = new URLSearchParams({
    data: JSON.stringify(data),
    source_url: `/${userId}/`,
  });

  const res = await fetch(url + "?" + params.toString(), {
    method: "GET",
    headers: {
      "x-pinterest-pws-handler": `www/${userId}.js`,
    },
  });
  if (!res.ok) throw new Error("Failed to fetch user");
  return res.json();
}

export async function fetchAllPaginatedData(
  id: string,
  type: "pin" | "board" | "user" | "boardPins" | "boardSections" | "sectionPins" | "boardlessPins",
  boardUrl?: string,
) {
  let allData = [];
  let bookmark = null;
  let start: number | null = 1;

  while (start || bookmark) {
    let result: any;

    if (type === "pin") {
      result = await fetchPin(id);
    } else if (type === "board") {
      result = await fetchBoard(id);
    } else if (type === "user") {
      result = await fetchUser(id);
    } else if (type === "boardPins") {
      result = await fetchBoardPins(id, bookmark, boardUrl);
    } else if (type === "boardSections") {
      result = await fetchBoardSections(id, boardUrl);
    } else if (type === "sectionPins") {
      result = await fetchBoardSectionPins(id, bookmark, boardUrl);
    } else if (type === "boardlessPins") {
      result = await fetchBoardlessPins(id, bookmark);
    }

    const data = result.resource_response.data;

    if (data.length === undefined) {
      // For user fetches, wrap single object in array
      allData = data;
      break;
    }

    allData.push(...data);
    bookmark = result.resource_response.bookmark || null;
    start = null;

    if (!data || data.length === 0) {
      break;
    }
  }

  return allData;
}
