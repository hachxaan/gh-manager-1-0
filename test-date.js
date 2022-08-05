const moment = require('moment');

const getPeriodDates = (periodEnum) => {
  const padTo2Digits = (num) => num.toString().padStart(2, '0');
  const formatDate = (date) =>
    [
      padTo2Digits(date.getDate()),
      padTo2Digits(date.getMonth() + 1),
      date.getFullYear(),
      // ].join('%2F');
    ].join('/');
  const getMonthUse = (d1, d2) => {
    var months;
    months = (d2.getFullYear() - d1.getFullYear()) * 12;
    months -= d1.getMonth();
    months += d2.getMonth();
    return months <= 0 ? 0 : months;
  };

  const end_date = new Date();
  const start_date = new Date();
  start_date.setDate(start_date.getDate() - periodEnum);
  const monthUse = getMonthUse(start_date, end_date);
  const periodDates = [];

  if (monthUse == 0) {
    periodDates.push({
      start_date: formatDate(start_date),
      end_date: formatDate(end_date),
    });
  } else {
    const currentDateProcess = new Date();
    for (let month = 0; month <= monthUse; month++) {
      if (month == 0) {
        periodDates.push({
          start_date: formatDate(moment(new Date()).startOf('month').toDate()),
          end_date: formatDate(end_date),
        });
      } else if (month == monthUse) {
        periodDates.push({
          start_date: formatDate(start_date),
          end_date: formatDate(moment(start_date).endOf('month').toDate()),
        });
      } else {
        currentDateProcess.setMonth(currentDateProcess.getMonth() - 1);
        periodDates.push({
          start_date: formatDate(
            moment(currentDateProcess).startOf('month').toDate(),
          ),
          end_date: formatDate(
            moment(currentDateProcess).endOf('month').toDate(),
          ),
        });
      }
    }
  }
  return periodDates;
};

//
const periodEnum = 90;

const periodos = getPeriodDates(periodEnum);
console.log(periodos);
