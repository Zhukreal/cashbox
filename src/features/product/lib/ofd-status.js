export const getOfdStatus = (ofdStatus) => {
  let status = '',
    color = ''
  switch (ofdStatus) {
    case 'ONL':
      status = 'Режим онлайн'
      color = '#25D77E'
      break
    case 'OFL':
      status = 'Автономный режим'
      color = '#ffdc02'
      break
    case 'BLK':
      color = '#F16F58'
      status = 'Касса заблокирована'
      break
    case 'SBL':
      break
  }

  // ONL - работа с ОФД в нормальном режиме(ONLINE),
  // OFL - работа кассы в автономном режиме (OFFLINE),
  // BLK - касса в режиме блокировки(BLOCKED),
  // SBL - касса в режиме серверной блокировки,
  // ITG - нарушение целостности данных.

  return [status, color]
}