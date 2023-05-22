export type BasicInfo = {
    Manufacturer: Manufacturer;
    OS: OS;
    hostname: string;
    user: User;
    timezone: Timezone;
}
export type Manufacturer = {
    manufacturer: string;
    model: string;
    version: string;
    serial: string;
    uuid: string;
    sku: string;
    virtual: boolean;
}
export type OS = {
    platform: string;
    distro: string;
    release: string;
    codename: string;
    kernel: string;
    arch: string;
    hostname: string;
    fqdn: string;
    codepage: string;
    logofile: string;
    serial: string;
    build: string;
    servicepack: string;
    uefi: boolean;
}
export type User = {
    uid: number;
    gid: number;
    username: string;
    homedir: string;
    shell: string;
}
export type Timezone = {
    current: number;
    uptime: number;
    timezone: string;
    timezoneName: string;
}
