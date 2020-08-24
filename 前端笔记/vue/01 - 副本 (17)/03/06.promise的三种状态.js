/*

pending（进行中）、 当promise实例化出时状态就为pending

fulfilled（已成功） 调用resolve就是已成功状态
                    也就是说你写 resolve() 除了可以调用你传入的回调函数，还可以把状态改为 已成功fulfilled

rejected（已失败）  调用reject就是已失败状态
                    也就是说你写 reject()   除了调用你传入的回调函数，还把状态改成了 已失败(rejected)

*/