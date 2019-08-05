import { Message, Notification } from 'element-ui'

export function Msgsuccess(msg: string) {
    Message({
        message: msg,
        type: 'success',
        duration: 5000
    })
}
export function Msgerror(msg: string) {
    Message({
        message: msg,
        type: 'error',
        duration: 5000
    })
}

export function Msgwarning(msg: string, dangerouslyUseHTMLString: boolean) {
    Message({
        message: msg,
        type: 'warning',
        duration: 5000,
        dangerouslyUseHTMLString
    })
}

export function Msgnotify(title: string, msg: string, dangerouslyUseHTMLString: boolean) {
    Notification({
        title: title,
        message: msg,
        duration: 5000,
        dangerouslyUseHTMLString
    })
}

export function MsgnotifySuccess(title: string, msg: string, callback: any) {
    Notification.success({
        title: title,
        message: msg,
        duration: 5000,
        dangerouslyUseHTMLString: true,
        onClick: callback ? callback : null
    })
}

export function MsgnotifyError(title: string, msg: string) {
    Notification.error({
        title: title,
        message: msg,
        duration: 5000
    })
}

export function MsgnotifyWarning(title: string, msg: string, callback: any) {
    Notification.warning({
        title: title,
        message: msg,
        duration: 5000,
        dangerouslyUseHTMLString: true,
        onClick: callback ? callback : null
    })
}
