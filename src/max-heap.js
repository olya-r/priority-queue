const Node = require('./node');

class MaxHeap {
	constructor() {
		this.clear();
	}

	push(data, priority) {
		const node = new Node(data, priority);
		this.insertNode(node);
		this.shiftNodeUp(node);
	}

	pop() {
		const root = this.root;
		if (root) {
			const detached = this.detachRoot();
			this.restoreRootFromLastInsertedNode(detached);
			this.shiftNodeDown(this.root);
			return root.data;
		}
	}

	detachRoot() {
		const root = this.root;
		this.root = null;
		if (this.parentNodes[0] == root) {
			this.parentNodes.shift();
		}
		return root;
	}

	restoreRootFromLastInsertedNode(detached) {
		const last = this.parentNodes.pop();
		if (last) {
			this.root = last;
			const parent = last.parent;
			if (parent) {
				if (parent != detached) {
					if (this.parentNodes[0] != parent) {
						this.parentNodes.unshift(parent);
						parent.right = null;
					}
					else {
						parent.left = null;
					}
				}
				last.parent = null;
				if (last != detached.left) {
					last.appendChild(detached.left);
				}
				if (last != detached.right) {
					last.appendChild(detached.right);
				}
				if (!last.right) {
					this.parentNodes.unshift(last);
				}
			}
		}
	}

	size() {
		return count(this.root);

		function count(node) {
			return node ? 1 + count(node.left) + count(node.right) : 0;
		}
	}

	isEmpty() {
		return !this.root;
	}

	clear() {
		this.root = null;
		this.parentNodes = [];
	}

	insertNode(node) {
		if (!this.root) {
			this.root = node;
			this.parentNodes.push(node);
		}
		else {
			this.parentNodes.push(node);
			this.parentNodes[0].appendChild(node);
		}

		if (this.parentNodes[0].left && this.parentNodes[0].right) {
			this.parentNodes.shift();
		}
	}

	shiftNodeUp(node) {
		const parent = node.parent;
		if (parent) {
			if (parent.priority < node.priority) {
				this._swapWithParent(node);
				this.shiftNodeUp(node);
			}
		}
	}

	shiftNodeDown(node) {
		if (node) {
			let child = null;
			let priority = node.priority;

			for (let candidate of [node.left, node.right]) {
				if (candidate && candidate.priority > priority) {
					child = candidate;
					priority = candidate.priority;
				}
			}

			if (child) {
				this._swapWithParent(child);
				this.shiftNodeDown(node);
			}
		}
	}

	_swapWithParent(node) {
		const parent = node.parent;
		node.swapWithParent();
		if (this.root == parent) {
			this.root = node;
		}
		const nodeIndex = this.parentNodes.indexOf(node);
		const parentIndex = this.parentNodes.indexOf(parent);
		if (nodeIndex != -1) {
			this.parentNodes[nodeIndex] = parent;
		}
		if (parentIndex != -1) {
			this.parentNodes[parentIndex] = node;
		}
	}
}

module.exports = MaxHeap;
