var ESX = null


let tick = setTick(async () => {
    if (ESX == null) {
        emit('esx:getSharedObject', async (obj) => {
            ESX = obj
            await Wait(1000)
        })
        clearInterval(tick)
        await Wait(1000);
    }
});

setTick(async () => {
    if (IsControlJustReleased(0, 85)) { // Q
       
        console.log(playerID)
    }
})

// function Notify(msg) {
//     SendNUIMessage({
//         type: 'is_notify',
//         msg: msg,
//         open: true
//     })
// }
// Notify(config.message)


setTick(async () => {
    // await Wait(6000)
    if (IsControlJustReleased(0, 182)) { // L
        let pos = GetEntityCoords(GetPlayerPed(-1))
        SetNuiFocus(true, true);
        SendNUIMessage({
            type: 'is_dev',
            pos: pos,
        });
    }
   
    let PlayerPed = GetPlayerPed(-1);
    for (let i = 0; i < config.position.length; i++) {
        let pos = config.position[i];
        let coords = GetEntityCoords(PlayerPed);
        let distance = GetDistanceBetweenCoords(coords[0], coords[1], coords[2], pos.coords.x, pos.coords.y, pos.coords.z);
        if (distance < 1.5) {
            await Wait(2000)
            SendNUIMessage({
                type: 'is_notify',
                message: config.message,
                open: true
            })
            // disPlayAlertBuy(config.message)
            if (distance < 1.5) {
                if (IsControlJustReleased(0, config.keys)) { // E
                    let accounts = ESX.GetPlayerData().accounts;
                    let cash = 0;
                    let bank = 0;
                    for(let i = 0 ; i< 3; i++){
                       if(accounts[i].name == 'money'){
                           cash = accounts[i].money
                           i=4
                       }
                    }
                    for(let i = 0 ; i< 3; i++){
                       if(accounts[i].name == 'bank'){
                           bank = accounts[i].money
                           i=4
                       }
                    }
                    sendToUi(bank, cash)
                    // TaskStartScenarioInPlace(PlayerPed, "PROP_HUMAN_ATM", 1000, true);
                    // setTimeout(() => {
                    //     ClearPedTasks(PlayerPed);
                    // }, 1500)
                    await emitNet('chi:bank:balance');
                }
            }
        } else {
            SendNUIMessage({
                type: 'is_notify',
                message: '',
                open: false
            })
        }
    }
});

let blipsLoaded = false

setTick(async () => {
    await Wait(2000);
    if (blipsLoaded == false) {
        for (let i = 0; i < config.position.length; i++) {
            let pos = config.position[i];
            let blip = AddBlipForCoord(pos.coords.x, pos.coords.y, pos.coords.z);
            SetBlipSprite(blip, pos.blip.icon);
            SetBlipScale(blip, pos.blip.scale)
            SetBlipColour(blip, pos.blip.color);
            SetBlipDisplay(blip, pos.blip.display);
            SetBlipAsShortRange(blip, true);
            BeginTextCommandSetBlipName("STRING");
            AddTextComponentString(pos.blip.name);
            EndTextCommandSetBlipName(blip);
        }
        blipsLoaded = true
    }
})

onNet('chi:bank:infot', async (balance, money) => {
    await Wait(1000)
    sendToUi(balance, money);
    sendUpData(balance, money);
})

RegisterNuiCallbackType('close')
on('__cfx_nui:close', (data) => {
    let PlayerPed = GetPlayerPed(-1);
    ClearPedTasks(PlayerPed);
    SetNuiFocus(false, false);
});

RegisterNuiCallbackType('withdraw')
on('__cfx_nui:withdraw', (res) => {
    SetNuiFocus(true, true);
    emitNet('chi:bank:withdraw', res.amount);
    emitNet('chi:bank:balance');
});
RegisterNuiCallbackType('deposit')
on('__cfx_nui:deposit', (res) => {
    SetNuiFocus(true, true);
    emitNet('chi:bank:deposit', res.amount);
    emitNet('chi:bank:balance');
});

function sendUpData(balance, money) {
    SendNUIMessage({
        type: 'updateBalance',
        bank: balance,
        cash: money,
    });
}

function sendToUi(balance, money) {
    let playerNameX = GetPlayerName(PlayerId());
    let playerID = GetPlayerServerId(PlayerId());
    
    // let playerID = PlayerId();
    SetNuiFocus(true, true);
    SendNUIMessage({
        type: 'is_show',
        bank: balance,
        cash: money,
        playerNameX: playerNameX,
        playerID: playerID 
    });
}

function disPlayAlertBuy(str) {
    SetTextFont(14);
    SetTextProportional(0);
    SetTextScale(0.0, 0.6);
    SetTextDropshadow(1, 1, 1, 1, true);
    SetTextEdge(1, 0, 0, 0, 255);
    SetTextDropShadow()
    SetTextOutline()
    SetTextEntry("STRING");
    AddTextComponentString(str);
    DrawText(0.5, 0.5);
}