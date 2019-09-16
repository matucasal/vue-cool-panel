<template>
	<transition name="modal-fade">
    <div class="modal-backdrop">
      <div class="modal"
        role="dialog"
        aria-labelledby="modalTitle"
        aria-describedby="modalDescription"
      >
        <section
          class="modal-body"
          id="modalDescription"
        >
          <slot name="body">
            Cuerpo
          </slot>
        </section>
        <footer class="modal-footer">
          <slot name="footer">
			  <button
              type="button"
              class="btn-modal btn-green"
              @click="doaction"
              aria-label="Aceptar"
            >
              Aceptar
            </button>
            <button
              type="button"
              class="btn-modal btn-gray"
              @click="close"
              aria-label="Cancelar"
            >
              Cancelar
            </button>
          </slot>
        </footer>
      </div>
    </div>
  </transition>
</template>

<script>
	export default {
		name: 'ActionModal',

		methods: {
			close: function () {
				console.log("CLOSE");
				this.$emit('close');
			},
			doaction: function () {
				console.log("OK");
				this.$emit('onModalAction');
			},
		}
	}
</script>
<style>
  .modal-backdrop {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: rgba(0, 0, 0, 0.3);
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .modal {
    background: #FFFFFF;
    box-shadow: 2px 2px 20px 1px;
    overflow-x: auto;
    display: flex;
    flex-direction: column;
  }

  .modal-header,
  .modal-footer {
    padding: 15px;
    display: flex;
  }

  .modal-header {
    color: #424242;
    justify-content: space-between;
  }

  .modal-footer {
    /* border-top: 1px solid #eeeeee; */
    justify-content: flex-end;
  }

  .modal-body {
    position: relative;
    padding: 20px 10px;
  }

  .btn-modal {
  	border-radius: 2px;
	  font-size: 16px;
	  margin: 0px 6px;
    padding: 4px 12px;
	  color: white;
  }

  .btn-gray {
	  background: #424242;
	  border: 1px solid #424242;
  }

  .btn-green {
    background: #4AAE9B;
    border: 1px solid #4AAE9B;
  }
</style>