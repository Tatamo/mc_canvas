import { CharacterObject } from "../CharacterObject";

class Boss extends CharacterObject {
	move(mp) {
		const { co_j } = mp;
	}

	/**
	 * 主人公とボスが接触しているかどうか判定します
	 * @param {CharacterObject} j 主人公
	 * @returns {boolean}
	 */
	checkHit(j) {
		return (
			j.c >= 100 &&
			j.c < 200 &&
			this.c >= 100 &&
			Math.abs(this.x - j.x) < 42 &&
			j.y > this.y - 20 &&
			j.y < this.y + 40
		);
	}

	/**
	 * ボスが踏むことのできる状態かどうか判定します
	 * @param {MainProgram} mp
	 * @returns {boolean}
	 */
	isFumuable(mp) {
		if (
			this.pt === 1250 ||
			this.pt === 1255 ||
			this.pt === 1251 ||
			this.pt === 1256
		)
			return false;
		if (mp.j_tokugi === 10 || (this.j_tokugi >= 12 && this.j_tokugi <= 15))
			return false;
		if (mp.boss_destroy_type === 2) return false;
		return true;
	}

	/**
	 * 主人公がボスを踏んでいるか判定します
	 * @param {MainProgram} mp
	 */
	checkFumu(mp) {
		const j = mp.co_j;
		if (j.vy <= 0) return false;
		if (mp.easy_mode === 2) {
			// イージーモードの場合は当たり判定が大きい
			return this.checkHit(j);
		}
		return Math.abs(b.x - j.x) < 34;
	}

	/**
	 * ボスが主人公に踏まれてダメージを受けたときの処理をします
	 * @param {MainProgram} mp
	 */
	fumuDamage(mp) {
		const j = mp.co_j;
		this.c4--;
		if (this.c < 200) {
			this.c = 60;
			this.pt = 1010;
		} else if (this.c < 300) {
			this.c = 70;
			this.pt = 1110;
		} else {
			this.c = 80;
			this.pt = 1210;
		}
		if (this.c4 === 1) {
			// 右向き
			this.c += 5;
			this.pt += 5;
		}
		this.c1 = 0;
		mp.gs.rsAddSound(8);

		// 主人公が敵を踏んだ状態にする
		j.y = this.y;
		j.vy = -320;
		mp.j_jump_type = 1;
		j.c = 110;
		j.c1 = -4;
		j.pt = 109;
	}
}

export { Boss };
