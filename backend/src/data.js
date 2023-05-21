import { exec } from 'child_process'
import { system, osInfo, time, mem } from "systeminformation"; // for basic
import { hostname, userInfo } from "os"; // for basic
import { cpus, loadavg } from "os"; // cpu
import { cpu } from 'systeminformation'; // cpu
import { networkInterfaces } from 'os';

/**
 * this file is used to get the basic information of the server
 * 1. basicinfo -> system(), osInfo(), time(), mem(), hostname(), userInfo()
 * 2. diskinfo() -> df -h # Linux Only
 * 3. memoryinfo() -> mem()
 * 4. cpuinfo() -> cpus(), loadavg(), cpu()
 * 5. network -> networkInterfaces()
 * import { basicinfo, diskinfo, memoryinfo, cpuinfo, network } from '.path/data.js'
 */

export const basicinfo = {
    Manufacturer: await system(),
    OS: await osInfo(),
    hostname: hostname(),
    user: userInfo(),
    timezone: time(),
    // services: await services('systemd'),
}

const path = () => {
    return new Promise((resolve, reject) => {
        exec(`env | grep PATH`, (err, stdout, stderr) => {
            if (err) reject(err);
            resolve(stdout);
        });
    });
};

export const diskinfo = () => {
    return new Promise((resolve, reject) => {
        exec('df -h', (error, stdout, stderr) => {
            if (error) reject(error);
            if (stderr) reject(stderr);
            // Parse the output to get the disk usage information
            const output = stdout.trim().split('\n');
            const headers = output.shift().trim().split(/\s+/);
            const usage = output.map(line => {
                const values = line.trim().split(/\s+/);
                const result = {};
                headers.forEach((header, i) => result[header] = values[i]);
                return result;
            });
            resolve(usage);
        });
    });
}

export const memoryinfo = () => {
    return new Promise((resolve, reject) => {
        exec('free -m', (error, stdout, stderr) => {
            if (error) reject(error);
            if (stderr) reject(stderr);
            // Parse the output to get the disk usage information
            const output = stdout.trim().split('\n');
            const headers = output.shift().trim().split(/\s+/);
            const usage = output.map(line => {
                const values = line.trim().split(/\s+/);
                const result = {};
                headers.forEach((header, i) => result[header] = values[i]);
                return result;
            });
            resolve(usage);
        });
    });
}


export const cpuinfo = () => {
    return new Promise(async (resolve, reject) => {
        try {
            const cache = await cpu()
            const cpus_ = (await cpus());
            cpus_.loadavg = loadavg()
            cpus_.cache = cache.cache;
            cpus_.speed = cache.speed;
            resolve(cpus_);
        }
        catch (e) {
            reject(e);
        }
    });
}
// for(const [key, value] of Object.entries(cache.cache)) console.log(`${key}: ${value/1024/1024} MB`)
export const network = networkInterfaces();

// Driver Code
// console.log(await basicinfo)
// console.log(await diskinfo())
// console.log(await memoryinfo())
// console.log(await cpuinfo())
// console.log(network)

