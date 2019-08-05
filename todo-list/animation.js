function showNumberWithAnimation(i, j ,randNumber) {
    let numberCell = $("#number-cell-" + i + "-" + j);
    numberCell.css('top', getPosTop(i, j));
    numberCell.css('left', getPosLeft(i, j));
    numberCell.css('background-color', getNumberCellBgColor(board[i][j]));
    numberCell.css('color', getNumberCellColor(board[i][j]));
    numberCell.text(randNumber);
    numberCell.animate({
        top: getPosTop(i, j),
        left: getPosLeft(i, j)
    }, 50);

}

//展示移动不画
function showMoveAnimation(fromx, fromy, tox, toy) {
    let numberCell = $("#number-cell-" + fromx + "-" + fromy);
    numberCell.animate({
        top: getPosTop(tox, toy),
        left: getPosLeft(tox, toy)
    }, 200);
}