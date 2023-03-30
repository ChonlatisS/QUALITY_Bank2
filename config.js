config = {
    keys: 38, // E
    message: "กด E เพื่อเปิดธนาคาร",
    position: [
        // position atmS
        {
            type: 'ATM',
            coords:  {x:-999.6030883789062,y:-765.3321533203125,z:79.85722351074219} ,
            blip: {
                icon: 389, //ID BLIPS
                name: "<font face='athiti'>ธนาคาร</font>",
                display: 2, //การแสดงผล https://docs.fivem.net/natives/?_0x9029B2F3DA924928
                scale: 0.7, // ขนาด BLIPS
                color: 1 // สี
            },
        }
    ],
    //position atm object models
    ATMs: [
        { o: -870868698, c: 'blue' },
        { o: -1126237515, c: 'blue' },
        { o: -1364697528, c: 'red' },
        { o: 506770882, c: 'green' }
    ]
}