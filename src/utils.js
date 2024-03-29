import schedule from "./data/schedule.json";
import slots from "./data/slots.json";
import categories from "./data/categories.json";

export const getCategory = category => {
  return categories.find(cat => cat.key === category).classname;
};

const getDay = day => {
  if (day === "2021-10-21") {
    return "October 21st";
  }
  if (day === "2021-10-22") {
    return "October 22st";
  }
};

const getRoom = roomId => {
  return roomId.toUpperCase();
};

const getHour = slotId => {
  return slots.find(slot => slot.key === slotId).start;
};

export const getScheduleInfo = talkId => {
  let day = undefined;
  let room = undefined;
  let slot = undefined;
  let result = undefined;

  schedule.forEach(dayData => {
    day = dayData.day;

    dayData.rooms.forEach(roomData => {
      room = roomData.room;

      roomData.slots.forEach(slotData => {
        slot = slotData.slot;
        if (slotData.talk === talkId) {
          result = {
            day: getDay(day),
            room: getRoom(room),
            hour: getHour(slot)
          };
        }
      });
    });
  });

  return result;
};
