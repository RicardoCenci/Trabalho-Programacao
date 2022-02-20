import { User } from "@types"

class Cache{
    static getUser(id : number) : User | null{
        const user = this.getEntry(`user-${id}`)
        if (!user) return null
        return user as User
    }
    static saveUser(user : User) : void{
        this.saveEntry(`user-${user.id}`, user)
    }
    static getEntry(key : string | number) : Object | null{
        const item = localStorage.getItem(key.toString())
        if (!item){return null}
        return JSON.parse(item) ?? null
    }

    static saveEntry(key : string, data : any) : void{
        try{
            localStorage.setItem(key, JSON.stringify(data))
        }catch(e){
            console.error(`Error trying to cache entry ${key}, ${e}`)
        }
    }
}

export default Cache