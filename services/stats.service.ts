import BookingModel from "../models/bookings";

export async function getBookingStatisticsForThisYear() {
  const year = new Date().getFullYear();
  const stats = await BookingModel.aggregate([
    {
      $match: {
        created_at: {
          $gte: new Date(year, 0, 1),
          $lte: new Date(year, 11, 31, 23, 59, 59, 999)
        }
      }
    },
    {
      $group: {
        _id: { $month: "$created_at" },
        totalFare: { $sum: "$total_fare" }
      }
    },
    {
      $sort: { _id: 1 }
    }
  ]);

  const monthlyStats = new Array(12).fill(0);
  stats.forEach(stat => {
    monthlyStats[stat._id - 1] = stat.totalFare;
  });

  return monthlyStats;
}

export async function getBookingStatisticsForThisMonth() {
  const year = new Date().getFullYear();
  const month = new Date().getMonth() + 1;
  const daysInMonth = new Date(year, month, 0).getDate();
  const stats = await BookingModel.aggregate([
    {
      $match: {
        created_at: {
          $gte: new Date(year, month - 1, 1),
          $lte: new Date(year, month - 1, daysInMonth, 23, 59, 59, 999)
        }
      }
    },
    {
      $group: {
        _id: { $dayOfMonth: "$created_at" },
        totalFare: { $sum: "$total_fare" }
      }
    },
    {
      $sort: { _id: 1 }
    }
  ]);

  const dailyStats = new Array(daysInMonth).fill(0);
  stats.forEach(stat => {
    dailyStats[stat._id - 1] = stat.totalFare;
  });

  return dailyStats;
}

export async function totalStats() {
  const year = new Date().getFullYear();
  const month = new Date().getMonth() + 1;
  const daysInMonth = new Date(year, month, 0).getDate();
  const now = new Date();
  const dayOfWeek = now.getDay();
  const diff = now.getDate() - dayOfWeek + (dayOfWeek === 0 ? -6 : 1); // adjust when day is Sunday
  const startOfWeek = new Date(now.setDate(diff));
  const endOfWeek = new Date(now.setDate(diff + 6));
  const total = await BookingModel.countDocuments();
  const yearCount = await BookingModel.countDocuments({
    created_at: {
      $gte: new Date(year, 0, 1),
      $lte: new Date(year, 11, 31, 23, 59, 59, 999)
    }
  });
  const monthCount = await BookingModel.countDocuments({
    created_at: {
      $gte: new Date(year, month - 1, 1),
      $lte: new Date(year, month - 1, daysInMonth, 23, 59, 59, 999)
    }
  });
  const weekCount = await BookingModel.countDocuments({
    created_at: {
      $gte: new Date(startOfWeek.getFullYear(), startOfWeek.getMonth(), startOfWeek.getDate()),
      $lte: new Date(endOfWeek.getFullYear(), endOfWeek.getMonth(), endOfWeek.getDate(), 23, 59, 59, 999)
    }
  });
  return {
    total: total,
    year: {
      year: year,
      count: yearCount
    },
    month: {
      month: `${year}-${month}`,
      count: monthCount
    },
    week: {
      start: startOfWeek,
      end: endOfWeek,
      count: weekCount
    }
  };
}