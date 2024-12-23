class Node<K, V> {
    public key:     K | null;
    public value:   V | null;
    public prev:    Node<K, V> | null;
    public next:    Node<K, V> | null;

    constructor(key: K | null, value: V | null) {
        this.key = key;
        this.value = value;
        this.prev = null;
        this.next = null;
    }

    moveToEnd(tail: Node<K, V>): void {
        if (this.prev) this.prev.next = this.next;
        if (this.next) this.next.prev = this.prev;
        this.prev = tail.prev;
        this.next = tail;
        if (tail.prev) tail.prev.next = this;
        tail.prev = this;
    }
}

export class LRUCache<K, V> {
    private limit: number;
    private cache: Map<K, Node<K, V>>;
    private head: Node<K, V>;
    private tail: Node<K, V>;

    constructor(limit: number = 42) {
        if (limit <= 0) {
            throw new Error('limit must be above zero');
        }
        this.limit = limit;
        this.cache = new Map<K, Node<K, V>>();
        this.head = new Node<K, V>(null, null);
        this.tail = new Node<K, V>(null, null);
        this.head.next = this.tail;
        this.tail.prev = this.head;
    }

    get(key: K): V | null {
        const node = this.cache.get(key);
        if (!node) return null;
        node.moveToEnd(this.tail);
        return node.value;
    }

    set(key: K, value: V): void {
        let node = this.cache.get(key);
        if (node) {
            node.value = value;
            node.moveToEnd(this.tail);
        } else {
            if (this.cache.size >= this.limit) {
                const del_node = this.head.next;
                if (del_node) {
                    this.cache.delete(del_node.key as K);
                    this.head.next = del_node.next;
                    if (del_node.next) del_node.next.prev = this.head;
                }
            }
            const new_node = new Node(key, value);
            this.cache.set(key, new_node);
            new_node.prev = this.tail.prev;
            new_node.next = this.tail;
            if (this.tail.prev) this.tail.prev.next = new_node;
            this.tail.prev = new_node;
        }
    }
}

