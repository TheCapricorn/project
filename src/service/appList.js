import {post} from "@/ajax/ajax";
import api from "@/ajax/api";
export  function getAppList(data) {
    console.log(data);
    console.log("getAppLists");

    return post({
        url: api.appcontroller.delete,
        data: {uapps: data}
    }).then(res => {
        // console.log(res);
        if (res.code === 200) {

        }
    });

}