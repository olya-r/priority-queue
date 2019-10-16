class Node {
	constructor(data, priority) {
		this.data = data;
		this.priority = priority;
		this.parent = null;
		this.left = null;
		this.right = null;
	}

	appendChild(node) {
		if (node) {
			if (!this.left) {
				this.left = node;
				node.parent = this;
			}
			else if (!this.right) {
				this.right = node;
				node.parent = this;
			}
		}
	}

	removeChild(node) {
		if (node) {
			if (this.left == node) {
				this.left = null;
				node.parent = null;
			}
			else if (this.right == node) {
				this.right = null;
				node.parent = null;
			}
			else {
				throw new Error('passed node is not a child of this node');
			}
		}
	}

	remove() {
		if (this.parent) {
			this.parent.removeChild(this);
		}
	}

	swapWithParent() {
		const parent = this.parent;
		
		if (parent) {
			const left = this.left;
			const right = this.right;
			const grand = parent.parent;

			if (parent.left == this) {
				this.left = parent;
				this.right = parent.right;

				if (this.right) {
					this.right.parent = this;
				}
			}
			else {
				this.left = parent.left;
				this.right = parent;

				if (this.left) {
					this.left.parent = this;
				}
			}

			this.parent = grand;

			if (grand) {
				if (grand.left == parent) {
					grand.left = this;
				}
				else {
					grand.right = this;
				}
			}

			parent.left = left;
			parent.right = right;
			parent.parent = this;

			if (left) {
				left.parent = parent;
			}
			if (right) {
				right.parent = parent;
			}
		}
	}
}

module.exports = Node;
