export const getUTCDateObj = dateStr => {
  const date = new Date(dateStr);
  return new Date(
    date.getUTCFullYear(),
    date.getUTCMonth(),
    date.getUTCDate() + 1,
    0,
    0,
    0
  );
};

export const getDateTimeFromStr = dateStrOrObj => {
  if (typeof dateStrOrObj === "string") {
    // console.warn( "Date Obj",dateStrOrObj );
    return new Date(dateStrOrObj);
  }
  return dateStrOrObj;
};

// 2019-12-21
export const formatDate = dateStr => {
  if (isValidTimestamp(dateStr)) {
    dateStr = new Date(dateStr);
  }
  const d = new Date(dateStr);
  let month = `${d.getUTCMonth() + 1}`;
  let day = `${d.getUTCDate()}`;
  const year = d.getUTCFullYear();

  if (month.length < 2) month = `0${month}`;
  if (day.length < 2) day = `0${day}`;
  const date = [year, month, day].join("-");
  return date;
};

// 2019_12_21_23_56_45_234
export const formatDate_ = dateStr => {
  if (isValidTimestamp(dateStr)) {
    dateStr = new Date(dateStr);
  }
  const d = new Date(dateStr);
  const month = `${d.getUTCMonth() + 1}`;
  const day = `${d.getUTCDate()}`;
  const year = d.getUTCFullYear();
  hour = d.getUTCHours();
  min = d.getUTCMinutes();
  sec = d.getUTCSeconds();
  millis = d.getUTCMilliseconds();
  const date = [year, month, day, hour, min, sec, millis].join("_");
  return date;
};

// 21 Dec
export const formatDate2 = dateStr => {
  if (isValidTimestamp(dateStr * 1000)) {
    dateStr = new Date(dateStr * 1000);
  }
  const months = [
    "Jan",
    "Feb",
    "March",
    "April",
    "May",
    "June",
    "July",
    "Aug",
    "Sept",
    "Oct",
    "Nov",
    "Dec"
  ];
  const d = new Date(dateStr);
  const month = d.getUTCMonth();
  const day = d.getUTCDate();
  return [day.toString(), months[month]].join(" ");
};

// 21 Dec. 2019
export const formatDate3 = dateStr => {
  if (isValidTimestamp(dateStr)) {
    dateStr = new Date(dateStr);
  }
  const months = [
    "Jan.",
    "Feb.",
    "March",
    "April",
    "May",
    "June",
    "July",
    "Aug.",
    "Sept.",
    "Oct.",
    "Nov.",
    "Dec."
  ];
  if (dateStr === "") return "";
  const d = new Date(dateStr);
  const month = d.getUTCMonth();
  const day = d.getUTCDate();
  const year = d.getUTCFullYear();
  return [day.toString(), months[month], year].join(" ");
};

// 21
export const day = dateStr => {
  if (isValidTimestamp(dateStr)) {
    dateStr = new Date(dateStr);
  }
  const d = new Date(dateStr);
  const day = d.getUTCDate();
  return day.toString();
};

// Dec.
export const month = dateStr => {
  if (isValidTimestamp(dateStr)) {
    dateStr = new Date(dateStr);
  }
  const months = [
    "Jan.",
    "Feb.",
    "March",
    "April",
    "May",
    "June",
    "July",
    "Aug.",
    "Sept.",
    "Oct.",
    "Nov.",
    "Dec."
  ];
  const d = new Date(dateStr);
  const month = d.getUTCMonth();
  return months[month];
};

// 2019
export const year = dateStr => {
  if (isValidTimestamp(dateStr)) {
    dateStr = new Date(dateStr);
  }
  const d = new Date(dateStr);
  const year = d.getUTCFullYear();
  return year.toString();
};

// 21st Dec. 2019
export const headerDate = dateStr => {
  if (isValidTimestamp(dateStr * 1000)) {
    dateStr = new Date(dateStr * 1000);
  }
  const months = [
    "Jan.",
    "Feb.",
    "March",
    "April",
    "May",
    "June",
    "July",
    "Aug.",
    "Sept.",
    "Oct.",
    "Nov.",
    "Dec."
  ];
  const d = new Date(dateStr);
  // UTC issue where dateStr is shifted by timezone
  // When we pass dateStr as "2019-03-21" we need to use getUTC* methods
  const month = d.getUTCMonth();
  const day = d.getUTCDate();
  const year = d.getUTCFullYear();
  let suffix = "y";
  if (day > 3 && day < 21) suffix = "th";
  else {
    switch (day % 10) {
      case 1:
        suffix = "st";
        break;
      case 2:
        suffix = "nd";
        break;
      case 3:
        suffix = "rd";
        break;
      default:
        suffix = "th";
        break;
    }
  }
  const formattedDateStr = [day.toString() + suffix, months[month], year].join(
    " "
  );
  return formattedDateStr;
};

export const currentDate = () => {
  const dateStr = formatDate(new Date());
  return dateStr;
};

function isValidTimestamp(_timestamp) {
  const newTimestamp = new Date(_timestamp).getTime();
  return isNumeric(newTimestamp);
}

function isNumeric(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
}

// 17:20 -> 5.20 PM && 17:00 -> 5 PM
export const formatTime = time => {
  let hours = time.substring(0, 2);
  let minutes = time.substring(3, 5);
  const ampm = hours >= 12 ? "PM" : "AM";
  hours = hours >= 12 ? hours - 12 : hours;
  minutes = minutes < 10 ? `0${minutes}` : minutes;
  if (minutes > 0) {
    var strTime = `${hours}.${minutes} ${ampm}`;
    return strTime;
  }
  var strTime = `${hours} ${ampm}`;
  return strTime;
};
