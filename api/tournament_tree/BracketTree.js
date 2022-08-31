const Node = require('./Node');

class BracketTree {
    constructor(props) {
        this.playerCount = props.playerCount;
        //true -> bys set to second round where applicable
        //false -> "Spotlight" All bys used in first round
        this.useStretch = props.useStretch;
        this.totalNodes = this.getTotalNodes(this.playerCount);
        this.maxDepth = this.getBracketDepth(this.totalNodes);
        this.rootNode = null;
        this.leaves = [];
        this.rank = 1;
        this.fakeId = 1;


        this.createTree(1, this.maxDepth, null, false);
        this.initTree(this.rootNode, this.getByCount());
        this.setRanks(this.rootNode, 1);


    }

    //by count is leaf node count at bottom level for a full tree - players
    //leaf node count == 2^maxDepth-1
    getByCount() {
        let totalLeafNode = Math.pow(2, this.maxDepth - 1);
        return totalLeafNode - this.playerCount;
    }

    getBracketDepth(totalNodes) {
        //depth = (log(total+1))/(log(2))
        let depth = (Math.log(totalNodes + 1) / Math.log(2));
        //if not even tree -> round up
        return Math.ceil(depth);
    }

//BST-> easy to get total from leafs
    getTotalNodes(leafNodes) {
        //Total = 2(Leafs)-1
        return (2 * leafNodes) - 1;
    }

    createTree(currentDepth, maxDepth, parent, isLeft) {
        //create node
        let props = {depth: currentDepth, parent: parent, isNull: false};
        let current = new Node(props);
        if (parent) {
            if (isLeft) {
                parent.left = current;
            } else {
                parent.right = current;
            }
        } else {
            this.rootNode = current
        }
        if (currentDepth === maxDepth) return;
        if (!current.left) {
            this.createTree(currentDepth + 1, maxDepth, current, true);
        }
        if (!current.right) {
            this.createTree(currentDepth + 1, maxDepth, current, false);
        }
    }
    getAllMatches(){
        let round = 1;
        let matchesObj = {}
        for (let i = this.maxDepth-1; i > 0; i-- ){
            matchesObj[round] = this.getMatchups(i);
            round++;
        }
        return matchesObj;
    }

    //matchup refers to
    getMatchups(depth) {
        let nodeArray = [];
        let matchArray = [];
        nodeArray = this.getNodesAtDepth(this.rootNode, depth, nodeArray)
        for (let i = 0; i < nodeArray.length; i++) {
            if (!nodeArray[i].areChildrenNull()) {
                matchArray.push(this.getMatchObject(nodeArray[i]));
            }
        }
        return matchArray;
    }

    getMatchObject(node) {
        let {left, right} = node.getChildren();
        return {left: left.getNonCircular(), right: right.getNonCircular()};
    }

    getNodesAtDepth(current, depth, nodeArray) {
        if (current.depth === depth) {
            nodeArray.push(current);
            return nodeArray;
        } else if (current.hasLeft()) {
            //go left
            nodeArray = this.getNodesAtDepth(current.left, depth, nodeArray);
        }
        if (current.hasRight()) {
            //go right
            nodeArray = this.getNodesAtDepth(current.right, depth, nodeArray);
        }
        return nodeArray;
    }


    setSubtree(subRoot, byCount) {
        let leftNode = subRoot.left;
        let rightNode = subRoot.right;
        this.leaves.push(leftNode.left);
        this.leaves.push(leftNode.right);
        this.leaves.push(rightNode.left);
        this.leaves.push(rightNode.right);
        leftNode.isChildrenSet = true;
        rightNode.isChildrenSet = true;

        if (!this.useStretch) {
            if (byCount >= 2) {
                rightNode.left.isNull = true;
                byCount--;
            }
            if (byCount > 0) {
                leftNode.left.isNull = true;
                byCount--;
            }
        } else {
            //more than two bys they both go right (2nd round bys)
            if (byCount >= 2) {
                rightNode.left.isNull = true;
                byCount--;
                rightNode.right.isNull = true;
                byCount--;
            }
            //one by stick to normal
            else {
                leftNode.left.isNull = true;
                byCount--;
            }

        }
        return byCount;
    }

    getNode(current, rank) {
        if (current.rank === rank) {
            return current;
        } else if (rank < current.rank) {
            //go left
            this.getNode(current.left, rank);
        } else if (rank > current.rank) {
            //go right
            this.getNode(current.right, rank);
        }
    }

    setRanks(current) {
        //LVR
        if (current.hasLeft()) {
            this.setRanks(current.left);
        }
        if (this.rank % 2 !== 0 && !current.isNull) {
            current.playerId = this.fakeId;
            current.winner = current.playerId;
            this.fakeId++;
        }
        current.rank = this.rank;
        this.rank++;

        if (current.hasRight()) {
            this.setRanks(current.right);
        }
    }

    initTree(current, byCount) {
        if (this.maxDepth - (current.depth - 1) === 3) {
            byCount = this.setSubtree(current, byCount);
            current.isChildrenSet = true;
            return byCount;
        }
        if (!current.left.isChildrenSet) {
            byCount = this.initTree(current.left, byCount);
        }
        if (!current.right.isChildrenSet) {
            byCount = this.initTree(current.right, byCount);
        }
        current.isChildrenSet = true;
        return byCount;
    }
}

module.exports = BracketTree;