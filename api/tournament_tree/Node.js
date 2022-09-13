class Node{
    constructor(props) {
        this.depth = props.depth;
        this.parent = props.parent;
        this.left = null;
        this.right = null;
        this.rank = props.rank;
        this.isNull = props.isNull || false;
        this.playerId = null;
        this.isChildrenSet = false;
    }
    getNonCircular(){
        let {parent, left, right, ...nodeObj} = this;
        return nodeObj;
    }
    areChildrenNull(){
        return (this.left.isNull && this.right.isNull);
    }
    setWinner(winnerNode){
        if(!this.playerId) {
            this.playerId = winnerNode.playerId;
        }
    }
    getChildren(){
        return {left:this.left, right:this.right}
    }
    hasLeft(){
        return this.left;
    }
    hasRight(){
        return this.right;
    }

}module.exports = Node;