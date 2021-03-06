/**
 * Header参数
 */
Vue.component("http-header-box", {
	props: ["headers", "comment", "prefix"],
	data: function () {
		return {
			editingIndex: -1,
			name: "",
			value: "",
			isAdding: false
		}
	},
	methods: {
		add: function () {
			this.isAdding = true;
			var that = this;
			setTimeout(function () {
				if (that.$refs.nameInput != null) {
					that.$refs.nameInput.focus()
				}
			}, 50);
		},
		confirmAdd: function () {
			if (this.name == null || this.name.length == 0) {
				alert("请输入Header名称");
				return;
			}

			if (this.editingIndex > -1) {
				this.headers[this.editingIndex].name = this.name;
				this.headers[this.editingIndex].value = this.value;
			} else {
				this.headers.push({
					name: this.name,
					value: this.value
				});
			}
			this.cancel();
		},
		cancel: function () {
			this.editingIndex = -1;
			this.isAdding = false;
			this.name = "";
			this.value = "";
		},
		remove: function (index) {
			if (!window.confirm("确定要删除此Header吗？")) {
				return;
			}
			this.cancel();
			this.headers.$remove(index);
		},
		edit: function (index) {
			this.editingIndex = index;
			this.isAdding = true;
			this.name = this.headers[index].name;
			this.value = this.headers[index].value;
		}
	},
	template: '<div> \
		<div style="margin-bottom: 1em">\
			<div class="ui label tiny" style="padding:4px" :class="{blue:editingIndex == index}" v-for="(header,index) in headers"> \
				{{header.name}}: {{header.value}}\
				&nbsp; <a href="" title="修改" @click.prevent="edit(index)"><i class="icon pencil small"></i></a>&nbsp; \
				<a href="" title="删除" @click.prevent="remove(index)"><i class="icon remove small"></i> </a> \
				<input type="hidden" :name="prefix + \'_headerNames\'" :value="header.name"/>\
				<input type="hidden" :name="prefix + \'_headerValues\'" :value="header.value"/> \
			</div>\
		</div> \
		<div v-if="isAdding"> \
			<table class="ui table definition"> \
				<tr> \
					<td class="title">名称</td> \
					<td> \
						<input type="text" name="name" v-model="name" ref="nameInput" @keyup.enter="confirmAdd" @keypress.enter.prevent="1" placeholder="Header名"/> \
					</td> \
				</tr> \
				<tr> \
					<td>值</td> \
					<td> \
						<input type="text" name="value" v-model="value"  @keyup.enter="confirmAdd" @keypress.enter.prevent="1" placeholder="Header值"/> \
					</td> \
				</tr> \
			</table> \
			<div style="margin-bottom:1em"> \
				<button class="ui button tiny" type="button" @click.prevent="confirmAdd()" v-if="editingIndex == -1">确认添加</button><button class="ui button tiny" type="button" @click.prevent="confirmAdd()" v-if="editingIndex > -1">确认保存</button>  &nbsp;<a href="" @click.prevent="cancel()">取消</a> \
			</div> \
		</div> \
		<button class="ui button tiny" type="button" @click.prevent="add()" v-if="!isAdding">+</button> \
		<p class="comment">{{comment}}</p> \
	</div>'
});