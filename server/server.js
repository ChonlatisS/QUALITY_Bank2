let ESX = null;

// ส่งข้อมูลกลับมาที่หน้าจอ
emit('esx:getSharedObject', function (obj) {
  ESX = obj;
})

console.log(`
█▀█ █▀█ █░█░█ █▀▀ █▀█ █▄▄ █▄█   █▀█ █░█ █░░ █ ▀█▀ █▄█   █▄▄ ▄▀█ █▄░█ █▄▀
█▀▀ █▄█ ▀▄▀▄▀ ██▄ █▀▄ █▄█ ░█░   ▀▀█ █▄█ █▄▄ █ ░█░ ░█░   █▄█ █▀█ █░▀█ █░█ 
                                                      ./Allscript/By:CopyX`
);

// ฝากเงิน
RegisterNetEvent('chi:bank:deposit')
onNet('chi:bank:deposit', (amount) => {
  let _source = source;
  let xPlayer = ESX.GetPlayerFromId(_source);

  if (amount == null || amount <= 0 || amount > xPlayer.getMoney()) {
    console.log('Invalid amount');
  }
  else {
    console.log('Deposit ' + amount + '$');
    xPlayer.removeMoney(parseInt(amount));
    xPlayer.addAccountMoney('bank', parseInt(amount));
    console.log('Deposited ' + amount + '$');
  }
})

//ถอนเงิน
RegisterNetEvent('chi:bank:withdraw')
onNet('chi:bank:withdraw', (amount) => {
  let _source = source;
  let min = 0;
  amount = parseInt(amount);
  let xPlayer = ESX.GetPlayerFromId(_source);
  min = xPlayer.getAccount('bank').money;
  if (amount == null || amount <= 0 || amount > min) {
    console.log('Invalid amount');
  }
  else {
    xPlayer.removeAccountMoney('bank', amount);
    xPlayer.addMoney(amount);
    console.log('Withdraw ' + amount + '$');
  }
})

//กระเป๋าทั้งหมด
RegisterNetEvent('chi:bank:balance')
onNet('chi:bank:balance', () => {
  let _source = source;
  let xPlayer = ESX.GetPlayerFromId(_source);
  let balance = xPlayer.getAccount('bank').money;
  let  money = xPlayer.getMoney();
  emitNet('chi:bank:infot', _source, balance, money);
})

